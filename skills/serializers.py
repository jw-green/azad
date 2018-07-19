from rest_framework import serializers

from .models import Lift, LiftByMass, UserLift, Skill, UserSkills

class LiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lift
        fields = ('id', 'name', 'gender', )

class LiftBMSerializer(serializers.ModelSerializer):
    lift = LiftSerializer(read_only=True)
    class Meta:
        model = LiftByMass
        fields = ('id', 'lift', 'mass', 'mean', 'std_dev', )

class UserLiftSerializer(serializers.ModelSerializer):
    lift = LiftBMSerializer(read_only=True)
    class Meta:
        model = UserLift
        fields = ('id', 'lift', 'sten_value', 'one_rep_max', )

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ('id', 'name', "short_name", 'min_value', 'max_value', )

class UserSkillsSerializer(serializers.ModelSerializer):
    skill = SkillSerializer(read_only=True)
    class Meta:
        model = UserSkills
        fields = ('id', 'skill', 'skill_level')
    


        