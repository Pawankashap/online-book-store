"""update tables relationship

Revision ID: 0c9372165cfc
Revises: 5e18554c199e
Create Date: 2023-10-03 18:24:46.907476

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0c9372165cfc'
down_revision = '5e18554c199e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    # with op.batch_alter_table('books', schema=None) as batch_op:
    #     batch_op.add_column(sa.Column('price', sa.Integer(), nullable=False))

    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.add_column(sa.Column('rating', sa.Integer(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.drop_column('rating')

    # with op.batch_alter_table('books', schema=None) as batch_op:
    #     batch_op.drop_column('price')

    # ### end Alembic commands ###
