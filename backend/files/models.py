from django.db import models
import uuid, os, hashlib

def file_upload_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    return os.path.join('uploads', filename)

class File(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    file = models.FileField(upload_to=file_upload_path)
    original_filename = models.CharField(max_length=255)
    file_type = models.CharField(max_length=100)
    size = models.BigIntegerField()
    uploaded_at = models.DateTimeField(auto_now_add=True)
    hash = models.CharField(max_length=64, db_index=True)
    is_duplicate = models.BooleanField(default=False)

    class Meta:
        ordering = ['-uploaded_at']

    def __str__(self):
        return self.original_filename

    def save(self, *args, **kwargs):
        if not self.hash:
            self.hash = self.generate_hash()

        duplicate = File.objects.filter(hash=self.hash).exclude(pk=self.pk).first()
        if duplicate:
            self.file = duplicate.file
            self.is_duplicate = True
            self.size = 0
        else:
            self.size = self.file.size
            self.is_duplicate = False
        super().save(*args, **kwargs)

    def generate_hash(self):
        hasher = hashlib.sha256()
        for chunk in self.file.chunks():
            hasher.update(chunk)
        return hasher.hexdigest()
