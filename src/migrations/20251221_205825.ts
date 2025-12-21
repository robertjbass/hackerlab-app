import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'user');
  CREATE TYPE "public"."enum_users_auth_provider" AS ENUM('github', 'email');
  ALTER TABLE "users" ADD COLUMN "role" "enum_users_role" DEFAULT 'user' NOT NULL;
  ALTER TABLE "users" ADD COLUMN "auth_provider" "enum_users_auth_provider";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users" DROP COLUMN "role";
  ALTER TABLE "users" DROP COLUMN "auth_provider";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_users_auth_provider";`)
}
