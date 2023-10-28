create policy "User Access pdeh8i_0"
on "storage"."objects"
as permissive
for select
to authenticated
using (((bucket_id = 'chat-files'::text) AND (((storage.foldername(name))[1])::uuid IN ( SELECT "ChatMembers".chat_id
   FROM "ChatMembers"
  WHERE ("ChatMembers".user_id = auth.uid())))));


create policy "User Access pdeh8i_1"
on "storage"."objects"
as permissive
for insert
to authenticated
with check (((bucket_id = 'chat-files'::text) AND (((storage.foldername(name))[1])::uuid IN ( SELECT "ChatMembers".chat_id
   FROM "ChatMembers"
  WHERE ("ChatMembers".user_id = auth.uid())))));



