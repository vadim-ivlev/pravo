{% import '../../../../macro/crosspage.swig' as macro %}

{% extends 'page.swig' %}

{% block head %}
    {% include 'crosspages/head.swig' %}
{% endblock %}

{% block sidebarLeft %}
    {% include 'crosspages/sidebarLeft.swig' %}
{% endblock %}

{% block main %}
    {% include 'crosspages/main.swig' %}
{% endblock %}

{% block footer %}
    {% include 'crosspages/footer.swig' %}
{% endblock %}