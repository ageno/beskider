---
layout: page
title: Blog
description: Artykuły i aktualności Beskider – wypożyczalnia rowerów w Beskidach.
permalink: /blog/
---

<p>Ostatnie wpisy z Beskider.</p>

<ul>
  {% for post in site.posts %}
  <li>
    <a href="{{ post.url }}">{{ post.title }}</a>
    <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%d.%m.%Y" }}</time>
  </li>
  {% endfor %}
</ul>

{% if site.posts.size == 0 %}
<p>Brak wpisów. Wkrótce pojawią się tu artykuły.</p>
{% endif %}
