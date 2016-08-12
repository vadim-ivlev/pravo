/**
 * Created by esolovyev on 14.02.2016.
 */

var Select = require('../../../../../blocks/custom/projects/juristical/forms/b-select/scripts/Select');

    class ListHeadToSelect {

        constructor(itemClass, containerClass, listClass) {

            this.id = _.random(0, 1000);
            this.elementId = `selectRubric-${this.id}`;

            this.$element = this.appendElement(containerClass);
            this.$list = $(listClass).addClass('is-tablet_block').addClass('is-tabletLanscape');

            this.collectItems(itemClass);

  /*          RG.events.subscribe(`${RG.ScreenViewer._modulePrefix}.update`, (topic, info) => {

                if (info.type === 'mobile' && info.type !== this.currentType) {

                    RG.logger.info(topic);
   */
                    this.run();
/*
                } else if(this.currentType !== info.type) {

                    this.$element.hide();
                    this.$list.show();
                }

                this.currentType = info.type;
            });*/
        }

        collectItems(itemClass) {

            var items = [];

            $(itemClass).each((i, el) => {

                items.push(RG.parser.getAttributes(el));
            });

            return this.setItems(items);
        }

        appendElement(containerClass) {

            var $element = $('<div />').attr('id', this.elementId).addClass('is-mobile_block');
            $(containerClass).append($element);

            return $element;
        }

        run() {

            this.selectedOption = this.selectedOption || _.findWhere(this.getItems(), {href: document.location.pathname});
            this.render();
        }

        getItems() {

            return this.items;
        }

        setItems(list) {

            this.items = list;
            return this.items;
        }

        setSelected(item) {

            this.selectedOption = item;
            return this.selectedOption;
        }

        render() {

            var items = this.getItems(),
                selectedOption = this.selectedOption;

            //RG.logger.trace(selectedOption);

            if(items.length) {

/*                this.$element.show();
                this.$list.hide();*/
/*
                if(this.component) {

                    this.component.set('items', items);
                    this.component.set('selectedOption', selectedOption);
                } else {*/

                    this.component = new Select({
                        el: this.elementId,
                        isolated: true,
                        data() {
                            return {
                                items,
                                selectedOption
                            };
                        }
                    });
/*                }*/
            }
        }
    };

module.exports = ListHeadToSelect;