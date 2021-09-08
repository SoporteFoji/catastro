# -*- coding: utf-8 -*-

from django import forms
from django.db import transaction

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from rest_framework import serializers

from openpyxl import Workbook, load_workbook

from foji.models.orchestra import Orchestra
from foji.models.director import Director
from foji.models.instructor import Instructor
from foji.models.cast_member import CastMember
from foji.models.personal_information import PersonalInformation


class ExcelRowForm(forms.Form):
    orchestra_name = forms.CharField()
    creation_date= forms.IntegerField()
    city = forms.CharField()
    area_name = forms.CharField()
    orchestra_status = forms.CharField()
    orchestra_type = forms.CharField()
    institution_name = forms.CharField()
    coordinator_name = forms.CharField()
    coordinator_phone_number_mobile = forms.CharField()
    coordinator_email = forms.EmailField()
    director_name = forms.CharField()
    director_phone_number_mobile = forms.CharField()
    director_email = forms.EmailField()


def excel_error(row, error):
    """Returns a dictionary representing the row and form errors."""
    return {
        'row': row,
        'error': error,
    }


def empty_cell_data(cell_data):
    """True if cell data is ``blank''."""
    spaces = False

    try:
        spaces = cell_data.isspace()
    except:
        pass

    if spaces:
        return True

    if cell_data:
        return False


def empty_data(data):
    """True if all data is ``blank'' (None or empty string)"""
    for key, value in data.items():
        spaces = False

        try:
            spaces = value.isspace()
        except:
            pass

        if spaces:
            continue

        if value:
            return False

    return True


def get_row_data(workbook, sheet_name=None, row=2):
    """
    Gets row data from a specific workbook, sheet and row.
    """

    if sheet_name:
        sheet = workbook[sheet_name]
    else:
        sheet = workbook.active

    data = {}

    data['orchestra_name'] = sheet[row][0].value
    data['creation_date'] = sheet[row][1].value
    data['city'] = sheet[row][4].value
    data['area_name'] = sheet[row][5].value
    data['orchestra_status'] = sheet[row][6].value
    data['orchestra_type'] = sheet[row][7].value
    data['institution_name'] = sheet[row][9].value
    data['coordinator_name'] = sheet[row][10].value
    data['coordinator_phone_number_mobile'] = sheet[row][11].value
    data['coordinator_email'] = sheet[row][12].value
    data['director_name'] = sheet[row][13].value
    data['director_phone_number_mobile'] = sheet[row][14].value
    data['director_email'] = sheet[row][15].value

    return data
