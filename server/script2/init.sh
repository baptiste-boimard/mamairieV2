# 0. je prends l'identité de postgres
export PGUSER=postgres

# 1. Création d'un utilisateur en BDD (with login)
createuser mamairieV2 --login --password

# 2. Création d'une BDD ocolis dont le propriétaire est ocolis_admin
createdb mamairieV2 --owner mamairieV2

# 3. Initialiser Sqitch
sqitch init mamairieV2_sqitch --engine pg # on indique qu'on travaille avec postgres (pg)

# 4. Je crèe une version 1 pour ma BDD
sqitch add 1.Create_DB -n "Create DB"
