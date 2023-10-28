create table "public"."UserProfiles" (
    "id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone default now(),
    "email" text,
    "firstname" text,
    "lastname" text
);


alter table "public"."UserProfiles" enable row level security;

CREATE UNIQUE INDEX "UserProfiles_pkey" ON public."UserProfiles" USING btree (id);

alter table "public"."UserProfiles" add constraint "UserProfiles_pkey" PRIMARY KEY using index "UserProfiles_pkey";

alter table "public"."UserProfiles" add constraint "UserProfiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."UserProfiles" validate constraint "UserProfiles_id_fkey";


