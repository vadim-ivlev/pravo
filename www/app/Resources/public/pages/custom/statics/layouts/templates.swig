{% import '../../../macro/crosspage.swig' as macro %}

{% extends '../../../layouts/page.swig' %}

{% block head %}
    {% include '../../../layouts/crosspages/head.swig' %}
{% endblock %}

{% block sidebarLeft %}
    {% include '../../../layouts/crosspages/sidebarLeft.swig' %}
{% endblock %}

{% block main %}
    {% include '../../../layouts/crosspages/main.swig' %}
{% endblock %}

{% block footer %}
    {% include '../../../layouts/crosspages/footer.swig' %}
{% endblock %}