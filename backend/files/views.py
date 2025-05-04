from django.db.models import Sum
from rest_framework import viewsets, status, filters
from rest_framework.response import Response
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend, FilterSet, NumberFilter, DateFilter

from .models import File
from .serializers import FileSerializer, StorageStatsSerializer


class FileFilter(FilterSet):
    size_min = NumberFilter(field_name="size", lookup_expr='gte')
    size_max = NumberFilter(field_name="size", lookup_expr='lte')
    uploaded_after = DateFilter(field_name="uploaded_at", lookup_expr='gte')
    uploaded_before = DateFilter(field_name="uploaded_at", lookup_expr='lte')

    class Meta:
        model = File
        fields = ['file_type', 'size_min', 'size_max', 'uploaded_after', 'uploaded_before']


class FileViewSet(viewsets.ModelViewSet):
    queryset = File.objects.all()
    serializer_class = FileSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_class = FileFilter
    search_fields = ['original_filename']

    def create(self, request, *args, **kwargs):
        file_obj = request.FILES.get('file')
        if not file_obj:
            return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)

        data = {
            'file': file_obj,
            'original_filename': file_obj.name,
            'file_type': file_obj.content_type,
        }

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class StorageStatsView(APIView):
    def get(self, request):
        total_files = File.objects.count()
        saved_bytes = File.objects.filter(is_duplicate=True).aggregate(
            total=Sum('size')
        )['total'] or 0
        data = {
            'total_files': total_files,
            'total_saved_bytes': saved_bytes
        }
        return Response(StorageStatsSerializer(data).data)
