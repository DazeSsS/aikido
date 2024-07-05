from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, re_path, include

from .views import GoogleCallbackView, CheckTokenView
from .yasg import urlpatterns as doc_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('api.internal.urls')),
    path('accounts/google/callback/', GoogleCallbackView.as_view()),
    path('accounts/google/checkToken', CheckTokenView.as_view()),
    re_path(r'^auth/', include('djoser.urls.authtoken')),
]

urlpatterns += doc_urls

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
