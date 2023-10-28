alter table "public"."UserPublicKeys" alter column "public_key" set data type jsonb using "public_key"::jsonb;

CREATE UNIQUE INDEX "UserPublicKeys_public_key_key" ON public."UserPublicKeys" USING btree (public_key);

alter table "public"."UserPublicKeys" add constraint "UserPublicKeys_public_key_key" UNIQUE using index "UserPublicKeys_public_key_key";


