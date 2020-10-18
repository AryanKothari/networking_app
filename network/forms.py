from django import forms 

class NewPostForm(forms.Form):
    body = forms.CharField(label='', widget=forms.Textarea(attrs={'class': 'form-control', "placeholder": "What's on your mind?"}))

    
