from rest_framework import routers
from .views import FuelEffeciencyViewSet

router = routers.DefaultRouter()
router.register("milage_api", FuelEffeciencyViewSet, basename="FuelEffeciency")
