from django.http import JsonResponse
from django.views import View  # Corrected import

def test_view(request):
    return JsonResponse({"message": "API Test Successful!"})

class InventoryList(View):
    def get(self, request):
        data = {"message": "Inventory API is working!"}
        return JsonResponse(data)

