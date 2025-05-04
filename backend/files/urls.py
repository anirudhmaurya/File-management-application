from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FileViewSet, StorageStatsView

router = DefaultRouter()
router.register(r'files', FileViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('storage-stats/', StorageStatsView.as_view(), name='storage-stats'),
]
