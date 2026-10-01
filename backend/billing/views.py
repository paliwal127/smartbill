from rest_framework import generics, status
from rest_framework.response import Response

from .models import Bill
from .serializers import BillSerializer


class BillListCreateView(generics.ListCreateAPIView):
    queryset = Bill.objects.all()
    serializer_class = BillSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        bill = serializer.save()
        return Response({'success': True, **BillSerializer(bill).data}, status=status.HTTP_201_CREATED)


class BillDetailView(generics.RetrieveDestroyAPIView):
    queryset = Bill.objects.all()
    serializer_class = BillSerializer
