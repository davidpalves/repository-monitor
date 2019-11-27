from django.test import TestCase

from model_mommy import mommy

from users.models import User


class TestRepository(TestCase):
    def setUp(self):
        self.repository = mommy.make(
            'monitor.Repository',
            full_name='davidpierre21/repository-monitor'
        )

    def test_str(self):
        self.assertEqual(
            str(self.repository),
            self.repository.full_name
        )

    def test_str_empty_string_full_name(self):
        self.repository.full_name = ''
        self.assertEqual(
            str(self.repository),
            ''
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
                email='author@email.com'
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
            self.author.email
        )

    def tearDown(self):
        self.author.delete()


class TestOwner(TestCase):
    def setUp(self):
        self.author = mommy.make('monitor.Author')

    def test_str(self):
        self.assertEqual(
            str(self.author),
            self.author.email
        )

    def tearDown(self):
        self.author.delete()
