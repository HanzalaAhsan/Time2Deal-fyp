# from django.http import JsonResponse
# from django.views import View  # Corrected import
# from .models import Inventory  # Import your Inventory model

# def test_view(request):
#     return JsonResponse({"message": "API Test Successful!"})

# class InventoryList(View):
#     def get(self, request):
#         data = {"message": "Inventory API is working!"}
#         return JsonResponse(data)

from django.http import JsonResponse
from django.views import View
from .models import Inventory  # Import the Inventory model

def test_view(request):
    return JsonResponse({"message": "API Test Successful!"})

class InventoryList(View):
    def get(self, request):
        # Fetch inventory data from the database
        inventory_items = list(Inventory.objects.values())  # Convert QuerySet to list
        return JsonResponse({"inventory": inventory_items}, safe=False)
