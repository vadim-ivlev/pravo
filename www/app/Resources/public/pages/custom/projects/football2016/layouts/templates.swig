{% import '../../../../macro/crosspage.swig' as macro %}

{% extends 'page.swig' %}

{% block meta %}
    {% include 'crosspages/meta.swig' %}
{% endblock %}

{% block head %}
    {% include 'crosspages/head.swig' %}
{% endblock %}

{% block header %}
    {% include 'crosspages/header.swig' %}
{% endblock %}

{% block schedule %}
    {% include 'crosspages/schedule.swig' %}
{% endblock %}

{% block main %}
    {% include 'crosspages/main.swig' %}
{% endblock %}

{% block sidebar %}
    {% include 'crosspages/sidebar.swig' %}
{% endblock %}

{% block footer %}
    {% include 'crosspages/footer.swig' %}
{% endblock %}