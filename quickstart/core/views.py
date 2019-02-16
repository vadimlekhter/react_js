from django.shortcuts import render

from django.views.generic import TemplateView


class QuickView (TemplateView):
    template_name = 'core/index.html'
