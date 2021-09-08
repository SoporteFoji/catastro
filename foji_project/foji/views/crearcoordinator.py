from django.views.generic.edit import CreateView

from foji.models.coordinator import Coordinator


class CoordinatorCreateView(CreateView):
    model = Coordinator
    template_name = 'coordinator_create.html'
    fields = ['user', 'personal_information']
