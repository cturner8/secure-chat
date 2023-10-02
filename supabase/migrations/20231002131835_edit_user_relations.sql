alter table "public"."ChatAdmins" drop constraint "ChatAdmins_user_id_fkey";

alter table "public"."ChatMembers" drop constraint "ChatMembers_user_id_fkey";

alter table "public"."ChatMessages" drop constraint "ChatMessages_sender_id_fkey";

alter table "public"."UserChatKeys" drop constraint "UserChatKeys_user_id_fkey";

alter table "public"."UserPublicKeys" drop constraint "UserPublicKeys_user_id_fkey";

alter table "public"."ChatAdmins" add constraint "ChatAdmins_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "UserProfiles"(id) not valid;

alter table "public"."ChatAdmins" validate constraint "ChatAdmins_user_id_fkey";

alter table "public"."ChatMembers" add constraint "ChatMembers_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "UserProfiles"(id) not valid;

alter table "public"."ChatMembers" validate constraint "ChatMembers_user_id_fkey";

alter table "public"."ChatMessages" add constraint "ChatMessages_sender_id_fkey" FOREIGN KEY (sender_id) REFERENCES "UserProfiles"(id) not valid;

alter table "public"."ChatMessages" validate constraint "ChatMessages_sender_id_fkey";

alter table "public"."UserChatKeys" add constraint "UserChatKeys_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "UserProfiles"(id) not valid;

alter table "public"."UserChatKeys" validate constraint "UserChatKeys_user_id_fkey";

alter table "public"."UserPublicKeys" add constraint "UserPublicKeys_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "UserProfiles"(id) not valid;

alter table "public"."UserPublicKeys" validate constraint "UserPublicKeys_user_id_fkey";


