create table "public"."ChatMessageFiles" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone default now(),
    "chat_id" uuid,
    "message_id" uuid,
    "path" text
);


alter table "public"."ChatMessageFiles" enable row level security;

CREATE UNIQUE INDEX "ChatMessageFiles_pkey" ON public."ChatMessageFiles" USING btree (id);

alter table "public"."ChatMessageFiles" add constraint "ChatMessageFiles_pkey" PRIMARY KEY using index "ChatMessageFiles_pkey";

alter table "public"."ChatMessageFiles" add constraint "ChatMessageFiles_chat_id_fkey" FOREIGN KEY (chat_id) REFERENCES "Chats"(id) not valid;

alter table "public"."ChatMessageFiles" validate constraint "ChatMessageFiles_chat_id_fkey";

alter table "public"."ChatMessageFiles" add constraint "ChatMessageFiles_message_id_fkey" FOREIGN KEY (message_id) REFERENCES "ChatMessages"(id) not valid;

alter table "public"."ChatMessageFiles" validate constraint "ChatMessageFiles_message_id_fkey";

create policy "User Insert"
on "public"."ChatMessageFiles"
as permissive
for insert
to authenticated
with check ((chat_id IN ( SELECT "ChatMembers".chat_id
   FROM "ChatMembers"
  WHERE ("ChatMembers".user_id = auth.uid()))));


create policy "User Select"
on "public"."ChatMessageFiles"
as permissive
for select
to authenticated
using ((chat_id IN ( SELECT "ChatMembers".chat_id
   FROM "ChatMembers"
  WHERE ("ChatMembers".user_id = auth.uid()))));



