create table "public"."ChatAdmins" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "chat_id" uuid,
    "user_id" uuid
);


alter table "public"."ChatAdmins" enable row level security;

CREATE UNIQUE INDEX "ChatAdmins_pkey" ON public."ChatAdmins" USING btree (id);

alter table "public"."ChatAdmins" add constraint "ChatAdmins_pkey" PRIMARY KEY using index "ChatAdmins_pkey";

alter table "public"."ChatAdmins" add constraint "ChatAdmins_chat_id_fkey" FOREIGN KEY (chat_id) REFERENCES "Chats"(id) not valid;

alter table "public"."ChatAdmins" validate constraint "ChatAdmins_chat_id_fkey";

alter table "public"."ChatAdmins" add constraint "ChatAdmins_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."ChatAdmins" validate constraint "ChatAdmins_user_id_fkey";

create policy "Authenticated Select"
on "public"."ChatMembers"
as permissive
for select
to authenticated
using (true);


create policy "User Select"
on "public"."ChatMessages"
as permissive
for select
to authenticated
using ((chat_id IN ( SELECT "ChatMembers".chat_id
   FROM "ChatMembers"
  WHERE ("ChatMembers".user_id = auth.uid()))));


create policy "User Select"
on "public"."Chats"
as permissive
for select
to authenticated
using ((id IN ( SELECT "ChatMembers".chat_id
   FROM "ChatMembers"
  WHERE ("ChatMembers".user_id = auth.uid()))));


create policy "User Select"
on "public"."UserChatKeys"
as permissive
for select
to authenticated
using ((chat_id IN ( SELECT "ChatMembers".chat_id
   FROM "ChatMembers"
  WHERE ("ChatMembers".user_id = auth.uid()))));


create policy "Public Select"
on "public"."UserPublicKeys"
as permissive
for select
to authenticated
using (true);


create policy "User Insert"
on "public"."UserPublicKeys"
as permissive
for insert
to authenticated
with check ((auth.uid() = user_id));



