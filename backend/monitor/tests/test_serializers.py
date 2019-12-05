from django.test import TestCase
from django.utils import timezone

from monitor.serializers import (AuthorSerializer, RepositorySerializer,
                          RepositoryNameIdSerializer, CommitSerializer)


class TestAuthorSerializer(TestCase):
    def setUp(self):
        self.serializer_class = AuthorSerializer

    def test_is_valid(self):
        serializer = self.serializer_class(
            data={
                'name': 'Gesonel',
                'email': 'gesonel@mestredosdisfarces.com'
            }
        )
        self.assertTrue(serializer.is_valid())

    def test_is_not_valid(self):
        serializer = self.serializer_class(
            data={
                'email': 'gesonel@mestredosdisfarces.com'
            }
        )
        self.assertFalse(serializer.is_valid())


class TestCommitSerailizer(TestCase):
    def setUp(self):
        self.serializer_class = CommitSerializer

    def test_is_valid(self):
        serializer = self.serializer_class(
            data={
                'sha': 'b98b94deb49dc62bb5aac5f9090c25d47cf948d5',
                'author': {
                    'nome': 'irmão do Jorel',
                    'email': 'irmão@jorel.com'
                    },
                'date': timezone.now(),
                'message': 'Adiciona filme do steve magal',
                'url': 'https://github.com/',
                'repository': {
                    'irmaodojorel/filmes-steve-magal'
                },
            }
        )

        self.assertTrue(serializer.is_valid())

    def test_is_not_valid(self):
        serializer = self.serializer_class(
            data={
                'author': {
                    'nome': 'irmão do Jorel',
                    'email': 'irmão@jorel.com'
                    },
                'date': timezone.now(),
                'message': 'Adiciona filme do steve magal',
                'url': 'https://github.com/',
                'repository': {
                    'irmaodojorel/filmes-steve-magal'
                },
            }
        )

        self.assertFalse(serializer.is_valid())


class TestRepositorySerializer(TestCase):
    def setUp(self):
        self.serializer_class = RepositorySerializer

    def test_is_valid(self):
        serializer = self.serializer_class(
            data={
                'full_name': 'vovoJuju/abacate',
                'owner_login': 'vovoJuju',
                'description': 'repositorio para colocar todos os avocodes',
                'commits': [{
                    'sha': 'b98b94deb49dc62bb5aac5f9090c25d47cf948d5',
                    'author':{
                        'name': 'vovoJuju',
                        'email': 'juju@abacate.com'
                    },
                    'date': timezone.now(),
                    'message': f'commit {i}',
                    'url': 'https://github.com/',
                    'repository': {
                        'full_name': 'vovoJuju/abacate'
                    }
                } for i in range(10)],
                'url': 'https://github.com/',
            }
        )

        self.assertTrue(serializer.is_valid())

    def test_is_not_valid(self):
        serializer = self.serializer_class(
            data={
                'owner_login': 'vovoJuju',
                'description': 'repositorio para colocar todos os avocodes',
                'commits': [{
                    'sha': 'b98b94deb49dc62bb5aac5f9090c25d47cf948d5',
                    'author':{
                        'name': 'vovoJuju',
                        'email': 'juju@abacate.com'
                    },
                    'date': timezone.now(),
                    'message': f'commit {i}',
                    'url': 'https://github.com/',
                    'repository': {
                        'full_name': 'vovoJuju/abacate'
                    }
                } for i in range(10)],
                'url': 'https://github.com/',
            }
        )

        self.assertFalse(serializer.is_valid())
