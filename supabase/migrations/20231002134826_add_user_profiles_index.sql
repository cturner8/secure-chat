CREATE INDEX "UserProfiles_email_idx" ON public."UserProfiles" USING btree (email);

create policy "User Select"
on "public"."UserProfiles"
as permissive
for select
to authenticated
using (true);



