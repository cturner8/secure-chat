create table "public"."ChatMembers" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "chat_id" uuid,
    "user_id" uuid
);


alter table "public"."ChatMembers" enable row level security;

create table "public"."ChatMessages" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone default now(),
    "message" text,
    "sender_id" uuid,
    "chat_id" uuid
);


alter table "public"."ChatMessages" enable row level security;

create table "public"."Chats" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone default now(),
    "name" text
);


alter table "public"."Chats" enable row level security;

create table "public"."UserChatKeys" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid,
    "chat_id" uuid,
    "key" text
);


alter table "public"."UserChatKeys" enable row level security;

create table "public"."UserPublicKeys" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid,
    "public_key" text
);


alter table "public"."UserPublicKeys" enable row level security;

CREATE UNIQUE INDEX "ChatMembers_pkey" ON public."ChatMembers" USING btree (id);

CREATE UNIQUE INDEX "ChatMessages_pkey" ON public."ChatMessages" USING btree (id);

CREATE UNIQUE INDEX "Chats_pkey" ON public."Chats" USING btree (id);

CREATE UNIQUE INDEX "UserChatKeys_pkey" ON public."UserChatKeys" USING btree (id);

CREATE UNIQUE INDEX "UserPublicKeys_pkey" ON public."UserPublicKeys" USING btree (id);

alter table "public"."ChatMembers" add constraint "ChatMembers_pkey" PRIMARY KEY using index "ChatMembers_pkey";

alter table "public"."ChatMessages" add constraint "ChatMessages_pkey" PRIMARY KEY using index "ChatMessages_pkey";

alter table "public"."Chats" add constraint "Chats_pkey" PRIMARY KEY using index "Chats_pkey";

alter table "public"."UserChatKeys" add constraint "UserChatKeys_pkey" PRIMARY KEY using index "UserChatKeys_pkey";

alter table "public"."UserPublicKeys" add constraint "UserPublicKeys_pkey" PRIMARY KEY using index "UserPublicKeys_pkey";

alter table "public"."ChatMembers" add constraint "ChatMembers_chat_id_fkey" FOREIGN KEY (chat_id) REFERENCES "Chats"(id) not valid;

alter table "public"."ChatMembers" validate constraint "ChatMembers_chat_id_fkey";

alter table "public"."ChatMembers" add constraint "ChatMembers_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."ChatMembers" validate constraint "ChatMembers_user_id_fkey";

alter table "public"."ChatMessages" add constraint "ChatMessages_chat_id_fkey" FOREIGN KEY (chat_id) REFERENCES "Chats"(id) not valid;

alter table "public"."ChatMessages" validate constraint "ChatMessages_chat_id_fkey";

alter table "public"."ChatMessages" add constraint "ChatMessages_sender_id_fkey" FOREIGN KEY (sender_id) REFERENCES auth.users(id) not valid;

alter table "public"."ChatMessages" validate constraint "ChatMessages_sender_id_fkey";

alter table "public"."UserChatKeys" add constraint "UserChatKeys_chat_id_fkey" FOREIGN KEY (chat_id) REFERENCES "Chats"(id) not valid;

alter table "public"."UserChatKeys" validate constraint "UserChatKeys_chat_id_fkey";

alter table "public"."UserChatKeys" add constraint "UserChatKeys_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."UserChatKeys" validate constraint "UserChatKeys_user_id_fkey";

alter table "public"."UserPublicKeys" add constraint "UserPublicKeys_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."UserPublicKeys" validate constraint "UserPublicKeys_user_id_fkey";


