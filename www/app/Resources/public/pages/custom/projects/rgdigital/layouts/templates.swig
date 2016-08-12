{% import '../../../../macro/crosspage.swig' as macro %}

{% extends 'page.swig' %}

{% block head %}
    {% include 'crosspages/head.swig' %}
{% endblock %}

{% block header %}
    {% include 'crosspages/header.swig' %}
{% endblock %}

{% block main %}
    {% include 'crosspages/main.swig' %}
{% endblock %}

{% block sidebarRight %}
    {% include 'crosspages/sidebarRight.swig' %}
{% endblock %}

{% block footer %}
    {% include 'crosspages/footer.swig' %}
{% endblock %}