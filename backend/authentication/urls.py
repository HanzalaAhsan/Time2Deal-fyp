from django.urls import path
from .views import test_view, InventoryList

urlpatterns = [
    path("test/", test_view, name="test_api"),  # Existing test route
    path("inventory/", InventoryList.as_view(), name="inventory-list"),  # ✅ New inventory route
]
