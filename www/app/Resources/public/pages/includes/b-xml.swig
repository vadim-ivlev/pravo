<xml>
<header>
    <![CDATA[
     <!-- include {[ name ]}.xml -->
     {{# tags__length}}
        {{# tags}}
            <!--#tag {{tag}} -->
        {{/ tags}}
     {{/ tags__length}}
    ]]>
</header>
<footer><![CDATA[<!-- / include {[ name ]}.xml -->]]></footer>
    {{# objects__length }}
        <objects>
        {{# objects}}
            <object uid="{{obj_kind}}-{{obj_id}}" datetime="{{datetime}}">
            <![CDATA[
			
			{% set object = 'objects__' %}
						
			{% include swigFile %}
			
            ]]>
            </object>
            {{/ objects}}
        </objects>
    {{/ objects__length }}
</xml>