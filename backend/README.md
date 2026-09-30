# Optional PHP/MySQL Backend Scaffold

This directory contains a PHP/PDO and MySQL/MariaDB scaffold kept alongside Eldoria's React client. It is not the default game API and is not automatically connected to `src/firebase.ts` or the browser routes.

## Files

- [`database.sql`](database.sql): relational schema and seed data.
- [`install.php`](install.php): database installation helper; inspect its behavior before running it.
- [`config/config.php`](config/config.php): application and database configuration.
- [`config/database.php`](config/database.php): PDO connection setup.
- [`cron/turn_worker.php`](cron/turn_worker.php): scheduled worker entry point.

## Local Setup

1. Install PHP with PDO MySQL support and a local MySQL-compatible database.
2. Create a dedicated database and least-privilege database user.
3. Review `config/config.php` and configure secrets outside version control where the deployment allows.
4. Inspect `database.sql` and `install.php`, then run the schema using your database tool or the installer.
5. Test the worker manually in a non-production database before scheduling it.

The exact schema, configuration keys, and worker behavior are owned by these files; this overview does not claim a fixed table count or compatibility guarantee.

## Deployment Cautions

- Do not expose an installer endpoint publicly. Restrict it during setup and remove or disable it afterward.
- Never deploy sample credentials or commit real database passwords.
- Use TLS, least-privilege credentials, input validation, and server-side authorization.
- Review the worker for idempotency and locking before scheduling it; overlapping runs can corrupt progression if the implementation is not guarded.
- Do not configure this scaffold as the live game service until its data contracts and authentication are deliberately integrated with the React client.

For the active browser data paths and Firebase boundary, see [API and Data Specification](../API_AND_DATA_SPEC.md) and [Security Specification](../security_spec.md).
