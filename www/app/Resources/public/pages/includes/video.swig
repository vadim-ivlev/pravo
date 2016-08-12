<div itemscope itemtype="http://schema.org/VideoObject" class="rg-video-wrapper">

    <rg-video
        title="{{title}}"
        file="{{video_uri}}"
        image="{{image_uri}}"
        url="{{uri}}"
        ratio="{{aspect_ratio}}"

        authors='{{#authors__length}} [{{#authors}} {"uri": "{{author_uri}}", "name": "{{name}}", "__LAST__": "{{authors__LAST__}}"}{{^ authors__LAST__}}, {{/ authors__LAST__}} {{/authors}}] {{/authors__length}}{{^authors__length}} [{{#custom_author}} {"name": "{{{custom_author}}}"} {{/custom_author}}] {{/authors__length}}'
     ></rg-video>

    <a itemprop="url" href="{{video_uri}}" >
        <meta itemprop="uploadDate" content="{{datetime__iso8601__ext}}">
        <meta itemprop="thumbnail" content="{{image_uri}}">
        <meta itemprop="description" content="{{text}}">
        <meta itemprop="isFamilyFriendly" content="true">

        <meta itemprop="name" content="">
        <meta itemprop="author" content="">
    </a>

</div>