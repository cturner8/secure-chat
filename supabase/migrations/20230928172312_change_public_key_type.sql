alter table "public"."UserPublicKeys" alter column "public_key" set data type json using "public_key"::json;


