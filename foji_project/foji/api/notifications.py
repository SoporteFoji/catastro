# -*- coding: utf-8 -*-

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers

from ..models.orchestra import Orchestra


class NotificationSerializer(serializers.Serializer):
    type = serializers.CharField()
    text = serializers.CharField()
    action = serializers.CharField()
    created_date = serializers.DateTimeField()


class NotificationAPIView(APIView):
    def get(self, request):
        try:
            administrator = request.user.administrator
        except:
            administrator = None

        if not administrator:
            return Response([])

        orchestras = Orchestra.objects.filter(
            is_active=False,
        )

        notifications = []

        for orchestra in orchestras:
            text = 'Activación de {} esta pendiente.'.format(
                orchestra.name,
            )

            action = '/orquesta/{}/'.format(orchestra.id)

            orchestra_notification = {
                'type': 'orchestra-pending-activation',
                'text': text,
                'action': action,
                'created_date': orchestra.created_date,
            }

            notifications.append(orchestra_notification)

        return Response(notifications)
