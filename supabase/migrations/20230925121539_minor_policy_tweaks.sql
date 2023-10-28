drop policy "Public Select" on "public"."UserPublicKeys";

drop policy "User Insert" on "public"."UserPublicKeys";

create policy "Authenticated Select"
on "public"."UserPublicKeys"
as permissive
for select
to authenticated
using (true);



