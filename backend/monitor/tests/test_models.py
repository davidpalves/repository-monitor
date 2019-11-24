from django.test import TestCase

from model_mommy import mommy

from users.models import User


class TestRepository(TestCase):
    def setUp(self):
        self.repository = mommy.make('monitor.Repository')

    def test_str(self):
        self.assertEqual(
            str(self.repository),
            f'{self.repository.owner}/{self.repository.name}'
        )

    def test_str_without_name(self):
        self.repository.name = None
        self.assertEqual(
            str(self.repository),
            f'{self.repository.owner}/None'
        )

    def test_str_without_owner(self):
        self.repository.owner = None
        with self.assertRaises(User.DoesNotExist):
            str(self.repository)

    def test_str_without_owner_and_name(self):
        self.repository.owner = None
        self.repository.name = None

        with self.assertRaises(User.DoesNotExist):
            str(self.repository)

    def test_str_empty_string_name(self):
        self.repository.name = ''
        self.assertEqual(
            str(self.repository),
            f'{self.repository.owner}/'
        )

    def tearDown(self):
        self.repository.delete()


class TestCommit(TestCase):
    def setUp(self):
        self.commit = mommy.make(
            'monitor.Commit',
            author=mommy.make(
                'monitor.Author',
                name='author',
                username='authorlogin'
            )
        )

    def test_str(self):
        self.assertEqual(
            str(self.commit),
            self.commit.sha
        )

    def tearDown(self):
        self.commit.delete()


class TestAuthor(TestCase):
    def setUp(self):
        self.author = mommy.make('monitor.Author')

    def test_str(self):
        self.assertEqual(
            str(self.author),
            self.author.username
        )

    def tearDown(self):
        self.author.delete()
