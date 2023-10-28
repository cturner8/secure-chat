create policy "User Insert"
on "public"."UserPublicKeys"
as permissive
for insert
to authenticated
with check ((user_id = auth.uid()));



