# from django.urls import path
# from .views import test_view, InventoryList  # ✅ Ensure InventoryList is imported

# urlpatterns = [
#     path("test/", test_view, name="test_view"),  
#     path("inventory/", InventoryList.as_view(), name="inventory-list"),  # ✅ Corrected
# ]
from django.urls import path
from django.http import JsonResponse
from .views import test_view, InventoryList  

# ✅ Define a home view for "/api/"
def api_home(request):
    return JsonResponse({"message": "API Home"})

urlpatterns = [
    path("", api_home, name="api_home"),  # 👈 This makes `/api/` work
    path("test/", test_view, name="test_view"),  
    path("inventory/", InventoryList.as_view(), name="inventory-list"),  
]

