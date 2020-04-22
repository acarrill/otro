from django import forms

class OrderForm(forms.Form):
    userName = forms.CharField(max_length=100)
    email = forms.EmailField(required=False)
    product = forms.CharField(max_length=100)
    numProducts = forms.IntegerField()
