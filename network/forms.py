from django import forms 

class NewPostForm(forms.Form):
    header = forms.CharField(label='',max_length=400, widget=forms.TextInput(attrs={'placeholder': 'Sum up your post with a header!', 'class': 'form-control'}))
    body = forms.CharField(label='', widget=forms.Textarea(attrs={'class': 'form-control', "placeholder": "What's on your mind?"}))

    
