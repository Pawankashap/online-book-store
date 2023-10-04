"""update tables relationship

Revision ID: e0310e74a0b1
Revises: 610be2533e78
Create Date: 2023-10-03 19:58:13.324507

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e0310e74a0b1'
down_revision = '610be2533e78'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('cartitems', schema=None) as batch_op:
        batch_op.add_column(sa.Column('book_id', sa.Integer(), nullable=True))
        batch_op.alter_column('user_id',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.create_foreign_key(batch_op.f('fk_cartitems_book_id_books'), 'books', ['book_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('cartitems', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_cartitems_book_id_books'), type_='foreignkey')
        batch_op.alter_column('user_id',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.drop_column('book_id')

    # ### end Alembic commands ###
