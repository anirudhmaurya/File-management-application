from rest_framework import serializers
from .models import File

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = [
            'id', 'file', 'original_filename', 'file_type',
            'size', 'uploaded_at', 'is_duplicate'
        ]
        read_only_fields = ['id', 'uploaded_at', 'is_duplicate', 'size']

class StorageStatsSerializer(serializers.Serializer):
    total_files = serializers.IntegerField()
    total_saved_bytes = serializers.IntegerField()
