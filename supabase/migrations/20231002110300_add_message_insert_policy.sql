create policy "User Insert"
on "public"."ChatMessages"
as permissive
for insert
to authenticated
with check ((chat_id IN ( SELECT "ChatMembers".chat_id
   FROM "ChatMembers"
  WHERE ("ChatMembers".user_id = auth.uid()))));



