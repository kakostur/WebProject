from django.urls import path
from .views import FAQListView, FAQCreateView, FAQUpdateView, FAQDeleteView

urlpatterns = [
    path("", FAQListView.as_view(), name="faq-list"),
    path("add/", FAQCreateView.as_view(), name="faq-add"),
    path("<int:pk>/update/", FAQUpdateView.as_view(), name="faq-update"),
    path("<int:pk>/delete/", FAQDeleteView.as_view(), name="faq-delete"),
]
