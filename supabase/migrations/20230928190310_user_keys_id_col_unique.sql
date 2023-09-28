CREATE UNIQUE INDEX "UserPublicKeys_user_id_key" ON public."UserPublicKeys" USING btree (user_id);

alter table "public"."UserPublicKeys" add constraint "UserPublicKeys_user_id_key" UNIQUE using index "UserPublicKeys_user_id_key";


