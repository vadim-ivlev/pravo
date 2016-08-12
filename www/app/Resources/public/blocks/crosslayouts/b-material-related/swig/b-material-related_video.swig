<!--#loadxml virtual="/include_xml/tmpl-b-feed/show_ltitle/has-video-{{video_id}}/index.xml" var="related_video_objects" limit="10" class="related_articles" -->

<!--#ifvar var="related_video_objects"-->

<div class="b-material-related">
    <div class="b-feed">
        <h2 class="b-feed__name">Последние статьи с этим видео:</h2>
         <!--#echo var="related_video_objects" -->
    </div>
</div>

<!--#endif -->