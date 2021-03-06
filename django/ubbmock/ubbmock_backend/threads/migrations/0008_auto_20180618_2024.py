# Generated by Django 2.0.4 on 2018-06-18 17:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('threads', '0007_remove_thread_votes'),
    ]

    operations = [
        migrations.AddField(
            model_name='thread',
            name='num_vote_down',
            field=models.PositiveIntegerField(db_index=True, default=0),
        ),
        migrations.AddField(
            model_name='thread',
            name='num_vote_up',
            field=models.PositiveIntegerField(db_index=True, default=0),
        ),
        migrations.AddField(
            model_name='thread',
            name='vote_score',
            field=models.IntegerField(db_index=True, default=0),
        ),
    ]
