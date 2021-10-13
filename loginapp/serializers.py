from rest_framework import serializers
from loginapp.models import CardOwnership, CustomUser

class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('username', 'char_first_name', 'char_last_name', 'server', 'data_center', 'password')
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class CardOwnershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardOwnership
        fields = ('user', 'card', 'owned')