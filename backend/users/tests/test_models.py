from django.test import TestCase

from model_mommy import mommy


class TestUser(TestCase):

    def setUp(self):
        self.user = mommy.make('users.User', username='test_username')

    def test_get_email(self):
        self.assertEqual(
            self.user.get_email(),
            self.user.email
        )

    def test_get_short_name(self):
        self.assertEqual(
            self.user.get_username(),
            self.user.username
        )

    def test_str(self):
        self.assertEqual(
            str(self.user),
            self.user.email
        )

    def tearDown(self):
        self.user.delete()


class TestGithubUser(TestCase):

    def setUp(self):
        self.user = mommy.make('users.User', username='test_username')
        self.github_user = mommy.make('users.GithubUser', user=self.user)

    def test_str(self):
        self.assertEqual(
            str(self.github_user),
            self.user.username
        )

    def tearDown(self):
        self.github_user.delete()
        self.user.delete()
