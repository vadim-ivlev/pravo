$(function(){
setTimeout(function() {
    var w = window;
    var d = w.document;
    var b = d.body;
    var popup;
    var service_uri;
    var saved_selection_data;
    var leftPopup = 0;
    var topPopup = 0;
    var screenWidth = b.clientWidth;
    w.onresize = function() { screenWidth = b.clientWidth; };
    var popupItem = d.getElementById('popup');
    var Nx = 630;

    var create_popup = function() {
      var p = d.createElement("div");
      var width = 200;
      if (width > b.clientWidth - 10) {
        width = b.clientWidth - 10;
      }
      p.style.zIndex = "2147483640";
      p.style.background = "#fff";
      p.style.width = width + "px";
      p.style.border = "1px solid #555";
      p.style.padding = "1em";
      insert_element(p);
      return p;
    };

    var create_service_control = function(s) {
      var control = d.createElement("div");
      control.id = s.id + "_control";
      control.innerHTML = s.caption;
      control.style.cursor = "pointer";
      addHandler(control, "click", function() { s.handler(s); });
      popup.appendChild(control);
    };

    var misprint_handler = function(s) {
      service_uri = s.service_uri;
      process_selection();
      return false;
    };
    //var other_handler = function() {
    //  alert("other action");
    //};

    var services = [
          {
            id: "misprint",
            service_uri: "//rg.ru/misprint/",
            caption: "Сообщить об опечатке",
            handler: misprint_handler
          }/*,
          {
            id: "other",
            service_uri: "//rg.ru/",
            caption: "other",
            handler: other_handler
          }*/
        ];

    var setup_popup = function () {
      popup = create_popup();
      for (service in services) {
        create_service_control(services[service]);
      }
      var close_control = d.createElement("div");
      close_control.id = "close_control";
      close_control.innerHTML = "Закрыть";
      close_control.style.cursor = "pointer";
      addHandler(close_control, "click", popup_hide);
      popup.appendChild(close_control);
    };

    var init = function() {
	//раньше было d.onkeypress из-за ошибке в Opera,
	//но в версии 12.0 поправили недоразумение, и теперь Opera работает, как остальные браузеры
	  d.onkeydown = keypress_handler;
      d.onmouseup = mouseup_handler;
      message = d.getElementById('message');
      setup_popup();
      popup_hide();
    };
    var tag1 = "<!!!>";
    var tag2 = "<!!!>";
    var offset = 60;
    var max_length = 256;

    var strings = {
        header: "Орфографическая ошибка в тексте:",
        text: "Послать сообщение об ошибке редактору?\nВаш браузер останется на той же странице.",
        send: "Отправить",
        cancel: "Отмена",
        cmnt_caption: "Комментарий для автора (необязательно):",
        err_sel_too_big: "Вы выбрали слишком большой объем текста!",
        err_bad_browser: "Ваш браузер не поддерживает возможность перехвата выделенного текста или IFRAME."
    };
    var iframe = null;
    var data = {};
    var already_submitted = false;
    var misprinted_text = "";

    var insert_element = function(e) {
        e.style.position = "absolute";
        e.style.top = "0px";
        if (b.lastChild) {
            b.insertBefore(e, b.lastChild);
        } else {
            b.appendChild(e);
        }
    };
    var create_iframe = function(iframe_name) {
        var div = d.createElement("DIV");
        div.innerHTML = "<iframe name=\"" + iframe_name + "\"></iframe>";
        div.style.display = 'none';
        insert_element(div);
        return d.childNodes[0];
    };
    var submit_data = function(url, selection_data, user_comment) {
        var iframe_name = "spellcheck";
        if (!iframe) {
            iframe = create_iframe(iframe_name);
        }
        var f = d.createElement("FORM");
        f.style.position = "absolute";
        f.style.top = "0px";
        f.action = service_uri;
        f.method = "post";
        f.target = iframe_name;
        var query_data = {
            ref: url,
            c_pre: selection_data.pre,
            c_sel: selection_data.text,
            c_suf: selection_data.suf,
            c_pos: selection_data.pos,
            c_tag1: tag1,
            c_tag2: tag2,
            charset: d.charset || d.characterSet || "",
            comment: user_comment
        };
        for (var k in query_data) {
            var h = d.createElement("INPUT");
            h.type = "hidden";
            h.name = k;
            h.value = query_data[k];
            f.appendChild(h);
        }
        insert_element(f);
        f.submit();
        f.parentNode.removeChild(f);
    };
    data.confirm = function(sel, flag) {
        var ts = new Date().getTime();
        var res = confirm(strings.docmsg + "\n   " + d.location.href + "\n" + strings.header + "\n   \"" + sel + "\"\n\n" + strings.text);
        var dt = new Date().getTime() - ts;
        if (!res) {
            if (!flag && dt < 50) {
                var sv = d.onkeyup;
                d.onkeyup = function(e) {
                    if (!e) {
                        e = window.event;
                    }
                    if (e.keyCode == 17) {
                        d.onkeyup = sv;
                        data.confirm(sel, true);
                    }
                };
            }
        }
    };
    data.css = function(misprint_tagged_string, submit_func) {
        if (already_submitted) {
            return;
        }
        already_submitted = true;
        var div = d.createElement("DIV");
        var w = 550;
        if (w > b.clientWidth - 10) {
            w = b.clientWidth - 10;
        }
        div.style.zIndex = "2147483640";
		offset_left = ($(window).width() - w)/2;
		offset_top = ($(window).height() - 200)/2;
		
		$('#cboxOverlay').show();
		
        div.innerHTML = "" + "<div id=\"misprint_box\" styles=\"width:" + w + "px; left:"+ offset_left +"px; top:"+ offset_top +"px\"><div class=\"misprint_head\">" + strings.header + "</div>" + "<div class=\"citate\">" + misprint_tagged_string.replace(tag1, "<u styles=\"color:red\">").replace(tag2, "</u>") + "</div>" + "<div styles=\"padding: 0 0 1em 0\">" + strings.text.replace(/\n/, "<br/>") + "</div>" + "<form styles=\"padding:0; margin:0; border:0\">" + "<div>" + strings.cmnt_caption + "</div>" + "<input type=\"text\" maxlength=\"250\" styles=\"width:100%; margin: 0.2em 0\" />" + "<div class=\"misprint_submit\">" + "<input class=\"comm\" type=\"submit\" value=\"" + strings.send + "\">&nbsp;" + "<input class=\"comm_cancel\" type=\"button\" value=\"" + strings.cancel + "\">" + "</div>" + "</form>" + "</div>" + "";
        insert_element(div);
        var inputs = div.getElementsByTagName("input");
        var forms = div.getElementsByTagName("form");
        var t = inputs[0];
        var saved_handler = null;
        var saved_data = [];
        var save_data = function() {
            d.onkeydown = saved_handler;
            saved_handler = null;
            div.parentNode.removeChild(div);
            for (var i = 0; i < saved_data.length; i++) {
                saved_data[i][0].style.visibility = saved_data[i][1];
            }
            already_submitted = false;
            misprinted_text = t.value;
			$('#cboxOverlay').hide();
        };
        var pos = function(p) {
            var s = {
                x: 0,
                y: 0
            };
            while (p.offsetParent) {
                s.x += p.offsetLeft;
                s.y += p.offsetTop;
                p = p.offsetParent;
            }
            return s;
        };
        setTimeout(function() {
            var w = div.clientWidth;
            var h = div.clientHeight;
            var x = (b.clientWidth - w) / 2 + b.scrollLeft;
            if (x < 10) {
                x = 10;
            }
            var y = (b.clientHeight - h) / 2 + b.scrollTop - 10;
            if (y < 10) {
                y = 10;
            }
            div.style.left = x + "px";
            div.style.top = y + "px";
            if (navigator.userAgent.match(/MSIE (\d+)/) && RegExp.$1 < 7) {
                var select = d.getElementsByTagName("SELECT");
                for (var i = 0; i < select.length; i++) {
                    var s = select[i];
                    var p = pos(s);
                    if (p.x > x + w || p.y > y + h || p.x + s.offsetWidth < x || p.y + s.offsetHeight < y) {
                        continue;
                    }
                    saved_data[saved_data.length] = [s, s.style.visibility];
                    s.style.visibility = "hidden";
                }
            }
            t.value = misprinted_text;
            t.focus();
            t.select();
            saved_handler = d.onkeydown;
            d.onkeydown = function(e) {
                if (!e) {
                    e = window.event;
                }
                if (e.keyCode == 27) {
                    save_data();
                }
            };
            forms[0].onsubmit = function() {
                submit_func(t.value);
                save_data();
                misprinted_text = "";
                popup_hide();
                return false;
            };
            inputs[2].onclick = function() {
                save_data();
            };
        },
        10);
    };
    var trim_string = function(str) {
        return ("" + str).replace(/[\r\n]+/g, " ").replace(/^\s+|\s+$/g, "");
    };
    var get_selection_data = function(sel) {
        try {
            if (saved_selection_data) {
              var ret_val = saved_selection_data;
              saved_selection_data = null;
              return ret_val;
            }
            var selected_text = null;
            var selection = null;
            if (sel) { selection = sel; }
            else {
              if (w.getSelection) {
                selection = w.getSelection();
              } else {
                if (d.getSelection) {
                    selection = d.getSelection();
                } else {
                    selection = d.selection;
                }
              }
            }
            if (selection != null) {
                var pre = "",
                selected_text = null,
                suf = "",
                pos = -1;
                if (selection.getRangeAt) {
                    var r = selection.getRangeAt(0);
                    selected_text = r.toString();
                    var range = d.createRange();
                    range.setStartBefore(r.startContainer.ownerDocument.body);
                    range.setEnd(r.startContainer, r.startOffset);
                    pre = range.toString();
                    var r_copy = r.cloneRange();
                    r_copy.setStart(r.endContainer, r.endOffset);
                    r_copy.setEndAfter(r.endContainer.ownerDocument.body);
                    suf = r_copy.toString();
                } else {
                    if (selection.createRange) {
                        var r = selection.createRange();
                        selected_text = r.text;
                        var range = selection.createRange();
                        range.moveStart("character", -offset);
                        range.moveEnd("character", -selected_text.length);
                        pre = range.text;
                        var r_copy = selection.createRange();
                        r_copy.moveEnd("character", offset);
                        r_copy.moveStart("character", selected_text.length);
                        suf = r_copy.text;
                    } else {
                        selected_text = "" + selection;
                    }
                }
                var p;
                var s = (p = selected_text.match(/^(\s*)/)) && p[0].length;
                var e = (p = selected_text.match(/(\s*)$/)) && p[0].length;
                pre = pre + selected_text.substring(0, s);
                suf = selected_text.substring(selected_text.length - e, selected_text.length) + suf;
                selected_text = selected_text.substring(s, selected_text.length - e);
                if (selected_text == "") {
                    return null;
                }
                return {
                    pre: pre,
                    text: selected_text,
                    suf: suf,
                    pos: pos
                };
            } else {
                alert(strings.err_bad_browser);
                return;
            }
        } catch(e) {
            return null;
        }
    };
    var process_selection = function() {
        if (navigator.appName.indexOf("Netscape") != -1 && eval(navigator.appVersion.substring(0, 1)) < 5) {
            alert(strings.err_bad_browser);
            return;
        }
        popup_hide();
        var selection_data = get_selection_data();
        if (!selection_data) {
            return;
        }
        with(selection_data) {
            pre = pre.substring(pre.length - offset, pre.length).replace(/^\S{1,10}\s+/, "");
            suf = suf.substring(0, offset).replace(/\s+\S{1,10}$/, "");
        }
        var trimmed = trim_string(selection_data.pre + tag1 + selection_data.text + tag2 + selection_data.suf);
        if (trimmed.length > max_length) {
            alert(strings.err_sel_too_big);
            return;
        }
        data.css(trimmed,
        function(user_comment) {
            submit_data(d.location.href, selection_data, user_comment);
        });
    };
    var keypress_handler = function(e) {
        var our_keys_pressed = 0;
        var we = w.event;
        if (we) {
            our_keys_pressed = we.keyCode == 10 || (we.keyCode == 13 && we.ctrlKey);
        } else {
            if (e) {
                our_keys_pressed = (e.which == 10 && e.modifiers == 2) || (e.keyCode == 0 && e.charCode == 106 && e.ctrlKey) || (e.keyCode == 13 && e.ctrlKey);
            }
        }
        if (our_keys_pressed) {
          var misprint_service_data;
          for (service in services) {
            misprint_service_data = services[service];
            if(service.id == 'misprint') break;
          }
          return misprint_handler(misprint_service_data);
        }
    };
    var mouseup_handler = function(e) {
        if(!e) e = w.event;
        var selection;
        if (w.getSelection) {
            selection = w.getSelection();
        } else {
          if (d.getSelection) {
            selection = d.getSelection();
          } else {
            selection = d.selection;
          }
        }
        var selected_text = null;
        if (selection != null) {
          if (selection.getRangeAt) {
              var r = selection.getRangeAt(0);
              selected_text = r.toString();
          } else {
              if (selection.createRange) {
                  var r = selection.createRange();
                  selected_text = r.text;
              } else {
                  selected_text = "" + selection;
              }
          }
        }
        if (selected_text == "") return;
        saved_selection_data = get_selection_data(selection);
        popup_get_position(e);
        //popup_show(10000);
    };
    var popup_get_position = function (e) {
        if(e.pageX || e.pageY) {
          leftPopup = e.pageX;
          topPopup = e.pageY;
        } else {
          leftPopup = e.clientX + (d.documentElement.scrollLeft || d.body.scrollLeft) - d.documentElement.offsetLeft;
          topPopup = e.clientY + (d.documentElement.scrollTop || d.body.scrollTop) - d.documentElement.offsetTop;
        }
    	return;
    };
    var popup_set_position = function () {
        var topP = topPopup;
        var leftP = leftPopup;
        if(leftP < 0) leftP = 0;
        if(topP < 0) topP = 0;
        if(leftP + Nx > screenWidth ) leftP = screenWidth - Nx;
        popup.style.top = topP + 'px';
        popup.style.left = 0;
    };
    var popup_hide = function () { popup.style.display = 'none'; };
    var popup_show = function (t) {
    	popup_set_position();
        popup.style.display = 'block';
    	setTimeout(popup_hide, t);
    };
    var addHandler = function (object, event, handler, useCapture) {
      if (object.addEventListener) {
            object.addEventListener(event, handler, useCapture ? useCapture : false);
      } else if (object.attachEvent) {
            object.attachEvent('on' + event, handler);
      } else alert("Add handler is not supported");
    };
    var removeHandler = function (object, event, handler) {
      if (object.removeEventListener) {
            object.removeEventListener(event, handler, false);
      } else if (object.detachEvent) {
            object.detachEvent('on' + event, handler);
      } else alert("Remove handler is not supported");
    };
    init();
}, 100);
});