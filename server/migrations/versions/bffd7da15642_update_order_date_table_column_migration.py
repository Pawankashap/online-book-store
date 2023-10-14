"""update order date table column migration

Revision ID: bffd7da15642
Revises: 64183a085f4a
Create Date: 2023-10-14 14:18:48.653368

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bffd7da15642'
down_revision = '64183a085f4a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('orders', 'orderdt')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('orders', sa.Column('orderdt', sa.DATETIME(), nullable=True))
    # ### end Alembic commands ###
